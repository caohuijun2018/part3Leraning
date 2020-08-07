const listHelper = require('../utils/list_helper')


describe('dummy true', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})


// describe('total likes', () => {
//     const listWithOneBlog = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       }
//     ]

//     test('when list has only one blog equals the likes of that', () => {
//       const result = listHelper.totalLikes(listWithOneBlog)
//       expect(result).toBe(5)
//     })
// })

// describe('total likes', () => {
//     const listWithOneBlog = [
//       { _id: "5a422ba71b54a676234d17fb",

//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 0,
//         __v: 0
//       }
//     ]

//     test('when list has only one blog equals the likes of that', () => {
//       const result = listHelper.totalLikes(listWithOneBlog)
//       expect(result).toBe(0)
//     })
// })

describe(' maxLikes', () => {
    const ListBlog = [{

        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 0
    },
    {
        title: 'hello to world',
        author: 'today',
        likes: 8
    },
    {
        title: 'I like beach',
        author: 'dodng',
        likes: 3
    },
    {
       title: 'The beautiful girl is you ',
        author: 'lan',
        likes: 9
    }]
    test(' which has the max likes', () => {
        const result = listHelper.maxLike(ListBlog)
        expect(result).toStrictEqual({title: 'The beautiful girl is you ',author: 'lan',likes: 9})
       // expect(result).toBe( 'hello to world')
    })
})