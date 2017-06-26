declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare interface Window {
    devToolsExtension: any,
    DISQUSWIDGETS: any,
	trackUrl: string,
    FB: any,
    fbAsyncInit: any
}

declare var FB: any;