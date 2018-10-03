# Soundblock
Open source music player and music discovery tool for Indepentent artists and fans powered by the Blockchain. 

It supports peer (fan) to peer (artist) payments for liscensed material with no fees, no record labels, no middlemen. The artist gets 100% of the profits.

![alt text](https://github.com/ntheile/soundblock/blob/master/src/assets/soundblock.png?raw=true "Soundblock")

## Problem Case
Artists are making less and less money for their art the more and more it becomes digitized. Independent music artists do still exists, such as Chance the Rapper, although he does not share any royalties with a record label he has to share his musical profits with 3rd party intermediaries like iTunes and Sportify and confirm to their pricing schemas. Despite advances in technology, still no artist owns 100% of his music due to licenses having to be handled by trusted third parties. Why I can't just goto spotify and upload my music? Why can't I get paid when I upload songs to Soundblock? 

Soundblock proposes self soverign music ownership for independent artists. 

## Artists
-  Upload and maintain ownership of your music without any record label (or any third parties)
-  Choose your own monetization scheme for the song/album: free, 5 free plays, pay per play, pay per month, pay to own 
   -  No fees are taken (not even from Soundblock) , you own 100% of profit
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
- Open decentralized protocol, MIT license
- Blockstack used for Identity and  storage. Factom used to aggreate hashes. 
  - An indexer on top of the Blockstack block explorer is used to aggregate public data and artists profiles
  - Free songs are not encrypted and are stored to the Artists storage bucket
    - An indexer could grab this and put it on a CDN (or just make sure the Artists storage bucket is a highly available CDN)
  - Paid songs are encrypted in the Artists storage bucket. 
    - When a fan pays for it, the artists signs the song with the fans public key and grants him access (the song is copied to the fans bucket)
- Bitcoin blockchain used to store music licences (*this is an optional premium feature)
  - A hash is stored to the blockchain
- Payments can be handled using fiat or crypto. Maybe an advanced token model can be created? (but not in V1 MVP)

## How Does Soundblock make money?
- Artists Premium Features
  - Back in da during the peak of the peer to peer and torrenting,  the clients, such as Kazzaa or uTorrent made alot of money on promoted front page content
    - An artist can Pay to be a daily promoted artist (in turn funding further development of the protocol).
    - An artist can pay a very small one time fee to fund the hash being written to the blockchain, let's say a 99 cent fee. 
    - Fans can pay for digital collectibles and game rewards in the client player software. Maybe buy a badge or digitial pin for being the worlds biggest Chance the Rapper fan.
- Donations
- Blockstack App rewards mining 

## MVP
- Music Player Client - handles decrypting liscensed music
- Self Sovereign Artist Ownership of raw music file - profile and upload song using Blockstack
- global independent music index - Store raw song hash and metadata to blockchain using Factom 
