import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { googleMeet } from "@/libs/googleMeet";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const POST = async (req: NextRequest) => {
  const { user, eventDetails, refreshToken } = await req.json();

  const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string
  ) => {
    const mailOptions = {
      from: user.email,
      to,
      subject,
      text,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {}
  };

  if (user) {
    try {
      const existingEvent = await prisma.event.findUnique({
        where: {
          hostId_attendeeEmail: {
            hostId: user.id,
            attendeeEmail: eventDetails.attendeeDetails.attendeeEmail,
          },
        },
      });

      if (existingEvent) {
        return NextResponse.json(
          { message: "Event already exists for this attendee." },
          { status: 409 }
        );
      }

      const conflictingEvent = await prisma.event.findFirst({
        where: {
          hostId: user.id,
          meetingDate: eventDetails.meetingDetails.meetingDate,
          OR: [
            {
              meetingStartTime: {
                lte: eventDetails.meetingDetails.endTime,
              },
              meetingEndTime: {
                gte: eventDetails.meetingDetails.startTime,
              },
            },
          ],
        },
      });

      if (conflictingEvent) {
        return NextResponse.json(
          {
            message:
              "You already have an event scheduled on this date at this time.",
          },
          { status: 409 }
        );
      }

      const googleMeetUrl = await googleMeet(eventDetails, refreshToken);

      const newEvent = await prisma.event.create({
        data: {
          hostId: user.id,
          attendeeName: eventDetails.attendeeDetails.attendeeName,
          attendeeEmail: eventDetails.attendeeDetails.attendeeEmail,
          messageForAttendee: eventDetails.attendeeDetails.messageForAttendee,
          meetingDate: eventDetails.meetingDetails.meetingDate,
          meetingStartTime: eventDetails.meetingDetails.startTime,
          meetingEndTime: eventDetails.meetingDetails.endTime,
          googleMeetUrl,
        },
      });

      const hostEmailTemplatePath = path.join(
        process.cwd(),
        "templates",
        "hostEmail",
        "HostEmail.html"
      );
      const eventMessage = eventDetails.attendeeDetails.messageForAttendee;
      let hostEmailHtml = fs.readFileSync(hostEmailTemplatePath, "utf8");
      hostEmailHtml = hostEmailHtml.replace("{{hostName}}", user.name);
      hostEmailHtml = hostEmailHtml.replace(
        "{{inviteeName}}",
        eventDetails.attendeeDetails.attendeeName
      );
      hostEmailHtml = hostEmailHtml.replace(
        "{{inviteeEmail}}",
        eventDetails.attendeeDetails.attendeeEmail
      );
      hostEmailHtml = hostEmailHtml.replace(
        "{{eventDateTime}}",
        `${eventDetails.meetingDetails.startTime} - ${eventDetails.meetingDetails.meetingDate} (Pakistan Standard Time)`
      );
      hostEmailHtml = hostEmailHtml.replace(
        "{{timeZone}}",
        "Pakistan Standard Time"
      );
      hostEmailHtml = hostEmailHtml.replace("{{eventMessage}}", eventMessage);

      const meetLink = `<a target="_blank" href="${googleMeetUrl}">Google Meet URL</a>`;
      if (googleMeetUrl) {
        hostEmailHtml = hostEmailHtml.replace("{{googleMeetUrl}}", meetLink);
      } else {
        hostEmailHtml = hostEmailHtml.replace(
          "{{googleMeetUrl}}",
          "Meet URL not available"
        );
      }

      const eventLink = `<a target="_blank" href="${process.env.NEXT_PUBLIC_APP_URL}/appointment/${newEvent.id}">View Event in Calendly</a>`;
      hostEmailHtml = hostEmailHtml.replace("{{eventLink}}", eventLink);

      const inviteeEmailTemplatePath = path.join(
        process.cwd(),
        "templates",
        "inviteeEmail",
        "InviteeEmail.html"
      );
      let inviteeEmailHtml = fs.readFileSync(inviteeEmailTemplatePath, "utf8");
      inviteeEmailHtml = inviteeEmailHtml.replace(
        "{{inviteeName}}",
        eventDetails.attendeeDetails.attendeeName
      );
      inviteeEmailHtml = inviteeEmailHtml.replace("{{hostName}}", user.name);
      inviteeEmailHtml = inviteeEmailHtml.replace(
        "{{eventStartTime}}",
        eventDetails.meetingDetails.startTime
      );
      inviteeEmailHtml = inviteeEmailHtml.replace(
        "{{timeZone}}",
        "Pakistan Standard Time"
      );
      inviteeEmailHtml = inviteeEmailHtml.replace(
        "{{eventDate}}",
        eventDetails.meetingDetails.meetingDate
      );
      inviteeEmailHtml = inviteeEmailHtml.replace(
        "{{eventMessage}}",
        eventMessage
      );
      if (googleMeetUrl) {
        inviteeEmailHtml = inviteeEmailHtml.replace(
          "{{googleMeetUrl}}",
          meetLink
        );
      } else {
        inviteeEmailHtml = inviteeEmailHtml.replace(
          "{{googleMeetUrl}}",
          "Meet URL not available"
        );
      }

      const hostEmailText = `Your event has been scheduled successfully. Details: ${JSON.stringify(
        eventDetails.meetingDetails
      )} Google Meet URL: `;
      const inviteeEmailText = `You have been invited to an event. Details: ${JSON.stringify(
        eventDetails.meetingDetails
      )} Google Meet URL: `;

      await sendEmail(
        user.email,
        "Event Scheduled Successfully",
        hostEmailText,
        hostEmailHtml
      );
      await sendEmail(
        eventDetails.attendeeDetails.attendeeEmail,
        "You have been invited to an event",
        inviteeEmailText,
        inviteeEmailHtml
      );

      return NextResponse.json(
        {
          message: "Event created successfully.",
          eventDetails: {
            eventId: newEvent.id,
            attendeeName: eventDetails.attendeeDetails.attendeeName,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Error creating event." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Session error. Please login again." },
      { status: 401 }
    );
  }
};
