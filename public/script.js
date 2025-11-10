const responseGetTopics = {
  topics: [
    {
      slug: 'coding',
      description: 'Code is love, code is life',
    },
    {
      slug: 'football',
      description: 'FOOTIE!',
    },
    {
      slug: 'cooking',
      description: 'Hey good looking, what you got cooking?',
    },
  ],
};
// Display the example response in the HTML element

const responseGetArticles = {
  articles: [
    {
      article_id: 34,
      author: 'grumpy19',
      title: 'The Notorious MSG’s Unlikely Formula For Success',
      topic: 'cooking',
      created_at: '2020-11-22T11:13:00.000Z',
      votes: 0,
      article_img_url:
        'https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700',
      comment_count: '11',
    },
    {
      article_id: 12,
      author: 'tickle122',
      title: 'The battle for Node.js security has only begun',
      topic: 'coding',
      created_at: '2020-11-15T13:25:00.000Z',
      votes: 0,
      article_img_url:
        'https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?w=700&h=700',
      comment_count: '7',
    },
    {
      article_id: 6,
      author: 'grumpy19',
      title:
        'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals',
      topic: 'coding',
      created_at: '2020-11-11T15:09:00.000Z',
      votes: 0,
      article_img_url:
        'https://images.pexels.com/photos/4383298/pexels-photo-4383298.jpeg?w=700&h=700',
      comment_count: '11',
    },
  ],
};
const responseGetUsers = {
  users: [
    {
      username: 'tickle122',
      name: 'Tom Tickle',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
    },
    {
      username: 'grumpy19',
      name: 'Paul Grump',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013',
    },
    {
      username: 'happyamy2016',
      name: 'Amy Happy',
      avatar_url:
        'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
    },
  ],
};
const responseGetArticleById = {
  article: {
    author: 'jessjelly',
    title: 'Running a Node App',
    article_id: 1,
    article_body:
      'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
    topic: 'coding',
    created_at: '2020-11-07T06:03:00.000Z',
    votes: 0,
    article_img_url:
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
    comment_count: 8,
  },
};
const responseGetCommentsByArticleId = {
  comments: [
    {
      comment_id: 89,
      votes: 2,
      created_at: '2020-10-24T06:08:00.000Z',
      author: 'cooljmessy',
      comment_body:
        'Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.',
      article_id: 1,
    },
    {
      comment_id: 86,
      votes: 14,
      created_at: '2020-10-04T01:03:00.000Z',
      author: 'tickle122',
      comment_body:
        'Et explicabo dignissimos officia dolore rerum aliquam corrupti. Culpa corporis earum et earum officia a est atque at. Quidem quo recusandae delectus autem possimus blanditiis optio. Sed culpa culpa. Exercitationem nemo aspernatur alias ut qui.',
      article_id: 1,
    },
  ],
};
const respnsePostCommentsByArticleId = {
  comment: {
    article_id: 1,
    username: 'grumpy19',
    comment_body: 'Added a comment',
  },
};
const responsePatchArticleByArticleId = {
  article: {
    article_id: 1,
    title: 'Running a Node App',
    topic: 'coding',
    author: 'jessjelly',
    body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
    created_at: '2020-11-07T06:03:00.000Z',
    votes: 8,
    article_img_url:
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700',
  },
};
document.getElementById('get-topics').innerText = JSON.stringify(
  responseGetTopics,
  null,
  4,
);
document.getElementById('get-articles').innerText = JSON.stringify(
  responseGetArticles,
  null,
  4,
);
document.getElementById('get-users').innerText = JSON.stringify(
  responseGetUsers,
  null,
  4,
);
document.getElementById('get-article-by-id').innerText = JSON.stringify(
  responseGetArticleById,
  null,
  4,
);
document.getElementById('get-comments-by-article-id').innerText =
  JSON.stringify(responseGetCommentsByArticleId, null, 4);
document.getElementById('post-comments-by-article-id').innerText =
  JSON.stringify(respnsePostCommentsByArticleId, null, 4);
document.getElementById('patch-article-by-article-id').innerText =
  JSON.stringify(responsePatchArticleByArticleId, null, 4);

console.dir(respnsePostCommentsByArticleId);
