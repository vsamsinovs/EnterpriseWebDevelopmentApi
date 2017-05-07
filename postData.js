import mongoose from 'mongoose';
import assert from 'assert';
import PostModel from './public/api/posts/post.schema';

const posts = [
  {
    id: 1,
    heading: 'India - Tiger population sees 30% increase.',
    link: 'http://www.bbc.com/news/world-asia-30896028',
    author: 'jbloggs',
    comments: [],
    date: "25th february 2017",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, nostrum, cumque culpa provident aliquam commodi assumenda laudantium magnam illo nostrum. Donec nibh sapien,molestie quis elementum et, dim non atino ipsum.   Fusce non ante sed lorem rutrum feugiat.Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa. Fusce non ante sed lorem rutrum feugiat. this is just some extra text",
    upvotes: 10
  },
  {
    id: 2,
    title: 'The button that is not.',
    link: 'http://blog.nuclearsecrecy.com/2014/12/15/button-isnt/',
    author: 'notme',
    comments: [],
    date: "23th february 2017",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, nostrum, cumque culpa provident aliquam commodi assumenda laudantium magnam illo nostrum. Donec nibh sapien,molestie quis elementum et, dim non atino ipsum.   Fusce non ante sed lorem rutrum feugiat.Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa. Fusce non ante sed lorem rutrum feugiat. this is just some extra text",

    upvotes: 12
  },
  {
    id: 3,
    title: 'Google Nears $1B Investment in SpaceX',
    link: null,
    author: 'notme',
    comments: [],
    date: "21th february 2017",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, nostrum, cumque culpa provident aliquam commodi assumenda laudantium magnam illo nostrum. Donec nibh sapien,molestie quis elementum et, dim non atino ipsum.   Fusce non ante sed lorem rutrum feugiat.Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa. Fusce non ante sed lorem rutrum feugiat. this is just some extra text",

    upvotes: 12
  },
  {
    id: 4,
    title: 'Coinbase Raises $75M from DFJ Growth, USAA, and More',
    link: 'http://blog.coinbase.com/post/108642362357/coinbase-raises-75m-from-dfj-growth-usaa-nyse',
    author: 'psmith',
    comments: [],
    date: "20th february 2017",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, nostrum, cumque culpa provident aliquam commodi assumenda laudantium magnam illo nostrum. Donec nibh sapien,molestie quis elementum et, dim non atino ipsum.   Fusce non ante sed lorem rutrum feugiat.Vestibulum pellentesque, purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat sem elit non sem. Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa. Fusce non ante sed lorem rutrum feugiat. this is just some extra text",

    upvotes: 2
  }
];

export const loadPosts = () => {
  PostModel.find({}).remove(function () {
    PostModel.collection.insert(posts, (err, docs) => {
      if (err) {
        console.log(`failed to Load Post Data`);
      }
      else {
        console.info(`${posts.length} posts were successfully stored.`);
      }
    })
  });
}