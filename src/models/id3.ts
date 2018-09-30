// decentralized id3 music tag - public metadata about a song, the license and a pointer to the raw music file
export class DID3Tag{
    
    public song: string;
    public artist: string;
    public album: string;
    public genre: string;
    public year: string;
    public guid: any;
    public createdAt: Date; 
    public artistDigitalSignature: string; // base64 
    public artistPublicKey: string; // base64
    public rawMusicFileHash: string; // sha256 hash
    public license: string; // free,  pay to own   - free for X plays, pay per month,

    constructor() {
        this.guid = (<any>window).guid();
        this.createdAt = (<any>Date).now();
    }
}