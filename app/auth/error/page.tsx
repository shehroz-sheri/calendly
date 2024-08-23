import AuthError from "@/app/(components)/authError/AuthError";

export const metadata = {
  title: "Authentication Error - Calendly",
  description:
    "An error occurred during authentication. Please try logging in again to access your Calendly account.",
  openGraph: {
    title: "Authentication Error - Calendly",
    description:
      "An error occurred during authentication. Please try logging in again to access your Calendly account.",
    url: "https://calendly-by-shehroz.vercel.app/auth/login",
    images: [
      {
        url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9b95c3b92b1ef692b5f69baaec6579d5/calendly.png",
        width: 1200,
        height: 630,
        alt: "Authentication Error - Calendly",
      },
    ],
  },
};

const ErrorPage = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <AuthError />
    </div>
  );
};

export default ErrorPage;
