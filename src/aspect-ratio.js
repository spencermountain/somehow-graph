const aspects = [
  {
    title: 'square',
    aliases: {},
    description: '1:1',
    ratio: 1,
    color: '#e9967a'
  },
  {
    title: 'old tvs',
    aliases: {
      '4:3': true
    },
    description: '4:3',
    ratio: 1.33,
    color: '#E97AA8'
  },
  {
    title: 'a4',
    aliases: {
      paper: true
    },
    description: '√2:1 (Lichtenberg ratio)',
    ratio: 1.41,
    color: '#BB7AE9'
  },
  {
    title: 'photograph',
    description: '3:2',
    aliases: {
      '3:2': true,
      photo: true
    },
    ratio: 1.5,
    color: '#7AE9BB'
  },
  {
    title: 'business card',
    description: '85.60 × 53.98 mm',
    aliases: {},
    ratio: 1.58577,
    color: '#7AA8E9'
  },
  {
    title: 'golden ratio',
    description: '1.6180339...',
    aliases: {
      '1.618': true,
      'golden': true
    },
    ratio: 1.6180,
    color: '#7AE9BB'
  },
  {
    title: 'hdtv',
    description: '16:9',
    aliases: {},
    ratio: 1.78,
    color: '#E9837A'
  },
  {
    title: 'widescreen',
    aliases: {},
    description: 'fancy tv screens, movie-theatres',
    ratio: 1.85,
    color: '#E9837A'
  },
  {
    title: '1:2',
    aliases: {},
    description: 'some modern cellphones',
    ratio: 2,
    color: '#BCE97A'
  },
  {
    title: 'cinemascope',
    aliases: {},
    description: 'some modern movie-theatres',
    ratio: 2.35,
    color: '#E9BA7A'
  },
]

//
const setAspectRatio = function(world, str) {
  str = str || ''
  str = str.trim().toLowerCase()
  let found = aspects.find((o) => o.title === str || o.aliases[str] === true)
  found = found || aspects[0] //default to square
  let width = world.state.height * found.ratio
  //set height, as a ratio of the width
  world.width(width)
  return world
}
module.exports = setAspectRatio
