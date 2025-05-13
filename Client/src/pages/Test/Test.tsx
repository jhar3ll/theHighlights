import React from 'react'
import { SongsAPI } from '../../api/SongsAPI'

const Test = () => {
  const mySongs = [
  {
    addedBy: 'Jharell',
    album: '3 Doors Down',
    artist: '3 Doors Down',
    title: "It's Not My Time",
    id: 0
  },
  {
    addedBy: 'Jharell',
    album: 'Chaos',
    artist: '311',
    title: 'Amber',
    id: 1
  },
  {
    addedBy: 'Jharell',
    album: '311',
    artist: '311',
    title: 'Down',
    id: 2
  },
  {
    addedBy: 'Jharell',
    album: 'Dude Ranch',
    artist: 'Blink-182',
    title: 'Dammit',
    id: 3
  },
  {
    addedBy: 'Jharell',
    album: 'Take Off Your Pants And Jacket',
    artist: 'Blink-182',
    title: 'First Date',
    id: 4
  },
  {
    addedBy: 'Jharell',
    album: 'The Colour And The Shape',
    artist: 'Foo Fighters',
    title: 'My Hero',
    id: 5
  },
  {
    addedBy: 'Jharell',
    album: 'Wasting Light',
    artist: 'Foo Fighters',
    title: 'Rope',
    id: 6
  },
  {
    addedBy: 'Jharell',
    album: 'Franz Ferdinand',
    artist: 'Franz Ferdinand',
    title: 'Take Me Out',
    id: 7
  },
  {
    addedBy: 'Jharell',
    album: 'A Place In The Sun',
    artist: 'Lit',
    title: 'My Own Worst Enemy',
    id: 8
  },
  {
    addedBy: 'Jharell',
    album: 'Nevermind',
    artist: 'Nirvana',
    title: 'Come As You Are',
    id: 9
  },
  {
    addedBy: 'Jharell',
    album: 'Nevermind',
    artist: 'Nirvana',
    title: 'In Bloom',
    id: 10
  },
  {
    addedBy: 'Jharell',
    album: 'Evil Empire',
    artist: 'Rage Against The Machine',
    title: 'Bulls On Parade',
    id: 11
  },
  {
    addedBy: 'Jharell',
    album: 'Rage Against The Machine',
    artist: 'Rage Against The Machine',
    title: 'Killing In The Name',
    id: 12
  },
  {
    addedBy: 'Jharell',
    album: 'Greatest Hits',
    artist: 'Red Hot Chili Peppers',
    title: 'Soul To Squeeze',
    id: 13
  },
  {
    addedBy: 'Jharell',
    album: 'Core',
    artist: 'Stone Temple Pilots',
    title: 'Dead & Bloated',
    id: 14
  },
  {
    addedBy: 'Jharell',
    album: 'Purple',
    artist: 'Stone Temple Pilots',
    title: 'Interstate Love Song',
    id: 15
  },
  {
    addedBy: 'Jharell',
    album: 'Core',
    artist: 'Stone Temple Pilots',
    title: 'Plush',
    id: 16
  },
  {
    addedBy: 'Jharell',
    album: 'The Vatican Gift Shop',
    artist: 'Stone Temple Pilots',
    title: 'Trippin On A Hole In A Paper Heart',
    id: 17
  },
  {
    addedBy: 'Jharell',
    album: 'Purple',
    artist: 'Stone Temple Pilots',
    title: 'Vasoline',
    id: 18
  },
  {
    addedBy: 'Jharell',
    album: '40oz To Freedom',
    artist: 'Sublime',
    title: 'Badfish',
    id: 19
  },
  {
    addedBy: 'Jharell',
    album: 'Siamese Dream',
    artist: 'The Smashing Pumpkins',
    title: 'Cherub Rock',
    id: 20
  },
  {
    addedBy: 'Jharell',
    album: 'Rubberneck',
    artist: 'Toadies',
    title: 'Possum Kingdom',
    id: 21
  }
]
    async function updateModel() {
      await SongsAPI.updateUserSongs(mySongs);
    }
  return (
    <div>
      <button onClick={updateModel}>Test</button>
    </div>
  )
}

export default Test;