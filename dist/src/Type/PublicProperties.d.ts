export type PublicProperties<Payload> = {
    [K in keyof Payload as Payload[K] extends Function ? never : K]: Payload[K];
};
