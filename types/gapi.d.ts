declare namespace gapi {
    namespace client {
      const calendar: {
        events: {
          list: (params: any) => Promise<any>;
          insert: (params: any) => Promise<any>;
        };
      };
    }
  }
  