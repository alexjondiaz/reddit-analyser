import  { get } from 'axios'

const metadata = async user => {
  try {
    const [ about, comments, submissions ] = await Promise.all([
      get(`https://www.reddit.com/user/${user}/about.json`),
      get(`https://api.pushshift.io/reddit/search/comment/?author=${user}&metadata=true&size=0`),
      get(`https://api.pushshift.io/reddit/search/submission/?author=${user}&metadata=true&size=0`)
    ])

    return {
      name: about.data.data.name,
      created: about.data.data.created,
      comments: comments.data.metadata.total_results,
      submissions: submissions.data.metadata.total_results,
        karma: {
        link: about.data.data.link_karma,
        comment: about.data.data.comment_karma,
      },
    }
  } catch (error) {
    throw error
  }
}

export default { metadata }
