const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("Get /api/topics", ()=>{
    test("200: Responds with the requested topics object containing an array of all the topics", () =>{
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body})=>{
            const { slug, description } = body.topics[0]
            expect(typeof slug).toBe("string")
            expect(typeof description).toBe("string")

        })
    })
})

describe("Get /api/articles", ()=>{
    test("200: Responds with the requested articles object containing an array of articles by counting the total number of comments", () =>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body})=>{
            const { topic, created_at, votes, article_img_url } = body.articles[0]
            expect(typeof article_img_url).toBe("string")
            expect(typeof votes).toBe("number")
            expect(typeof created_at).toBe("string")
            expect(typeof topic).toBe("string")

        })
    })
})

describe("Get /api/users", ()=>{
    test("200: Responds with the requested users object by containing an array of all the users", () =>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body})=>{
            const { username, name, avatar_url } = body.users[0]
            expect(typeof username).toBe("string")
            expect(typeof name).toBe("string")
            expect(typeof avatar_url).toBe("string")

        })
    })
})

describe("Get /api/articles/:article_id", ()=>{
    test("200: Responds an object with the key of article and the value of an article object", () =>{
        return request(app)
        .get("/api/articles/9")
        .expect(200)
        .then(({body})=>{
            const { author, title, article_id, article_body, topic, created_at, votes, article_img_url } = body.article
            expect(typeof author).toBe("string")
            expect(typeof article_id).toBe("number")
            expect(typeof votes).toBe("number")
            expect(article_id).toBe(9)
        })
    })
   
    test("404: Responds an error message with the error code 404 when id is not found", () =>{
        return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Article not found")
        })
    })
     test("400: Responds an error message with the error code 400 when id is not valid", () =>{
        return request(app)
        .get("/api/articles/mnb")
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Invalid input")
        })
    })
})

describe("Get /api/articles/:article_id/comments", ()=>{
    test("200: Responds an object with the key of comments and the value of an array of comments for the given article id", () =>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({body})=>{
            const { votes, author, comment_body, article_id } = body.comments[0]
            expect(typeof comment_body).toBe("string")
            expect(typeof author).toBe("string")
            expect(typeof article_id).toBe("number")
            expect(typeof votes).toBe("number")
            expect(article_id).toBe(1)
        })
    })
   
    test("404: Responds an error message with the error code 404 when article id is not found", () =>{
        return request(app)
        .get("/api/articles/999/comments")
        .expect(404)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Comments not found")
        })
    })
     test("400: Responds an error message with the error code 400 when article id is not valid", () =>{
        return request(app)
        .get("/api/articles/mnb/comments")
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Invalid input")
        })
    })
})



