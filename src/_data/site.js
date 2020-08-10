const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  return {
    title: 'Umang\'s Blog',
    email: 'umang@umanggalaiya.in',
    description: 'Musings from my everyday life as a Software Engineer',
    url: isProduction ? 'https://umanggalaiya.in/blog' : 'http://localhost:8080/blog',
    keywords: [
      'programming',
      'software',
      'engineer',
      'engineering',
      'frontend',
      'javascript',
      'code',
      'technology',
      'tech',
      'umang',
      'galaiya',
      'umanghome',
      'blog',
    ],
    owner: {
      name: 'Umang Galaiya',
      avatar: 'umang.jpg',
      job: 'Frontend Engineer at Razorpay',
      bio: 'HCI and Technology nerd',
      email: 'umang@umanggalaiya.in',
      'disqus-shortname': 'umanggalaiyablog',
      twitter: 'umanghome',
      facebook: 'umanghome',
      google: {
        plus: null,
        analytics: 'UA-58535571-2',
        verify: null,
        'ad-client': null,
        'ad-slot': null,
      },
      'bing-verify': null,
      github: 'umanghome',
      stackoverflow: '4176188/umang-galaiya',
      linkedin: 'umanggalaiya',
      xing: null,
      instagram: 'umanghome',
      lastfm: null,
      tumblr: null,
      pinterest: null,
      foursquare: null,
      steam: null,
      dribbble: null,
      youtube: null,
      soundcloud: null,
      weibo: null,
      flickr: null,
      codepen: null,
      telegram: null,
    },
  };
}