# Soundblock
Independent open music player and community for artists and fans powered by the Blockchain.  

## Artists
-  Upload and maintain ownership of your music without any record label (or any third parties)
-  Choose your own monetization scheme for the song/album: free, 5 free plays, pay per play, pay per month, pay to own 
                   - No fees are taken (not even from Soundblock) , you own 100% of profit
- Gamify your music to engage and build your fan base (network effect)

## Fans
- Listen to your favorite artists using the Soundblock player.
- Listen to songs for free or pay the artists directly for great songs (no fees are paid to middlemen, the artists get 100%) .


## Mission
Soundblock is created for everyone by an open community of passionate musicians and software developers.  

## Principles
- The artist always maintains control of the raw music file - Self Sovereign Music Ownership
- The artist always sets the price of his work [or free]
- This platform is only for independent artist or artists who have consent to distribute their own music legally

## Global Independent Music Index
- Although the raw music file is owned and stored by the artists a global index of public data generate and includes
  - Hash of the raw music file
  - Metadata about the song (ID3)
    - Song name
    - Artist name
    - Album name (if any)
    - Composer
    - Genre [Array]
    - Year
  - License

## Technology
- Decentralized and open source application (Dapp). 
- Inspires to be an open decentralized protocol
- Blockstack used for Identity and  storage.
  - An indexer on top of the Blockstack block explorer is used to aggregate public data and artists profiles
  - Free songs are not encrypted and are stored to the Artists storage bucket
    - An indexer could grab this and put it on a CDN (or just make sure the Artists storage bucket is a highly available CDN)
  - Paid songs are encrypted in the Artists storage bucket. 
    - When a fan pays for it, the artists signs the song with the fans public key and grants him access (the song is copied to the fans bucket)
- Bitcoin blockchain used to store music licences (*this is an optional premium feature)
  - A hash is stored to the blockchain
- Payments can be handled using fiat or crypto. Maybe an advanced token model can be created? (but not in V1 MVP)

## How Does Soundblock make money?
- Donations
- Artists Premium Updates
  - Pay to be a daily promoted artist
  - Pay for digital rights managements (i.e hash to blockchain) 
  - Fans can pay for digital collectibles and game rewards
- Blockstack App rewards mining 

## MVP
- Music Player Client - handles decrypting liscensed music
- Self Sovereign Artist Ownership of raw music file - profile and upload song using Blockstack
- global independent music index - Store raw song hash and metadata to blockchain using Factom 
