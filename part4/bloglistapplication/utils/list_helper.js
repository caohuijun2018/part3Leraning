const dummy = (blogs) => {
return 1
}

const totalLikes = (blogs) => {
    return blogs[0].likes
    
}
const maxLike = (blogs) => {
    let max = blogs[0].likes
    let flag = 0;
    //return Math.max(Math,blogs.map(blog => {return blog.title}))
    //let max =Math.max.apply(Math,blogs.map(item => { return item.likes }))
//    console.log(blogs.sort((a,b) => {return a.likes > b.likes})[0].likes)  

   //return blogs.sort((a,b) => {return a.likes <b.likes})[0].title
    for(let i = 1; i < blogs.length;i++){
        if(blogs[i].likes > max){
            max = blogs.likes
            flag = i
        }else if(blogs[i].likes === max){
        flag = i
        }
    }
    
    
     return blogs[flag].title
}
  module.exports = {
    dummy,
    totalLikes,
    maxLike
  }
  