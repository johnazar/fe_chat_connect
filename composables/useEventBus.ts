import mitt from 'mitt';

type ApplicationEvents = {
    'chat:users': string[];
    'chat:request': { from: string; to: string };
    'chat:response': {
        from: string;
        to: string;
        accepted: boolean;
    };

    toast: { text: string; type: 'success' | 'error' | 'info' };
    'modal:connect': boolean;
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
