const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app.js");
require('jest-sorted')

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("Any endpoint", () =>{
    test("404: Responds an error message when the endpoint does not exists", ()=>{
        return request(app)
        .get("/any-invalid-path")
        .expect(404)
        .then(({body})=>{
            expect(body.message).toBe("Path not found")
        })
    })
})

describe("Get /api/topics", ()=>{
    test("200: Responds with the requested topics object containing an array of all the topics", () =>{
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body: { topics } })=>{
            expect(topics).toBeInstanceOf(Array)
            expect(topics).toHaveLength(data.topicData.length)
            expect(topics.length>0)
            topics.forEach((topic) =>{
                expect(typeof topic.slug).toBe("string")
                expect(typeof topic.description).toBe("string")
            })         

        })
    })
})

describe("Get /api/articles", ()=>{
    test("200: Responds with a key of articles object containing an array of article objects by counting the total number of comments", () =>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body: { articles } })=>{
            expect(articles).toBeInstanceOf(Array)
            expect(articles).toHaveLength(data.articleData.length)
            expect(articles.length>0)

            articles.forEach((article) => {
                expect(article).toEqual(
                    expect.objectContaining({
                        article_img_url : expect.any(String),
                        votes : expect.any(Number),
                        created_at : expect.any(String),
                        topic : expect.any(String)
                    })
                )
            })         

        })
    })
    test("200: Responds with a key of articles object containing an array of articles objects by sorting created date desc", () => {
        const validColumns = ["created_at", "votes"]
        return Promise.all(
            validColumns.map((sort_col) => {
                return request(app)
                .get("/api/articles")
                .query({ sort_by: sort_col, order: "DESC" })
                .expect(200)
                .then((res) => {
                    expect(res.body.articles).toBeInstanceOf(Array);
                    expect(res.body.articles.length).toBeGreaterThan(0);
                    expect(res.body.articles).toBeSortedBy(sort_col, { descending: true });
            });
        }))
    })
    test("200: Responds by filtering the articles by the topic value specified in the query", () => {
       
        return request(app)
            .get("/api/articles")
            .query({ topic: "mitch" })
            .expect(200)
            .then((res) => {
                expect(res.body.articles).toBeInstanceOf(Array);
                expect(res.body.articles.length).toBeGreaterThan(0);
                res.body.articles.forEach((article) => {
                    expect(article.topic).toBe("mitch")
                })
            });
       
    })
    test("400: Responds an error message when topic is not valid type", () => {
       
        return request(app)
            .get("/api/articles")
            .query({ topic: 99999 })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toBe("Invalid input");
            });
       
    })
    test("404: Responds an error message when topic is not present in database", () => {
       
        return request(app)
            .get("/api/articles")
            .query({ topic: "not-mitch" })
            .expect(404)
            .then((res) => {
                expect(res.body.message).toBe("Articles not found");
            });
       
    })
    test("400: Responds a 404 when the request accepts invalid queries", () =>{
        const inValidColumns = ["not_a_valid_column"]
        return Promise.all(
            inValidColumns.map((sort_col) => {
                return request(app)
                .get("/api/articles")
                .query({ sort_by: sort_col, order: "invalid" })
                .expect(400)
                .then((res) => {
                    expect(res.body.message).toBe("Invalid input");
                })
        }))
    })
})

describe("Get /api/users", ()=>{
    test("200: Responds with the requested users object by containing an array of all the users", () =>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({body: {users}})=>{
            expect(users).toBeInstanceOf(Array)
            expect(users).toHaveLength(data.userData.length)
            expect(users.length>0)
            users.forEach((user) => {            
                expect(typeof user.username).toBe("string")
                expect(typeof user.name).toBe("string")
                expect(typeof user.avatar_url).toBe("string")
            })

        })
    })
})

describe("Get /api/articles/:article_id", ()=>{
    test("200: Responds an object with the key of article and the value of an article object", () =>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body})=>{
            const { author, title, article_id, article_body, topic, created_at, votes, article_img_url, comment_count } = body.article
            expect(typeof author).toBe("string")
            expect(typeof article_id).toBe("number")
            expect(typeof votes).toBe("number")
            expect(article_id).toBe(1)
            expect(author).toBe("butter_bridge")
            expect(comment_count).toBe(11)
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
        .get("/api/articles/not-an-article-id")
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
            return expect(message).toBe("Article Not found")
        })
    })
     test("400: Responds an error message with the error code 400 when article id is not valid", () =>{
        return request(app)
        .get("/api/articles/not-an-article-id/comments")
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Invalid input")
        })
    })
})

describe("Post /api/articles/:article_id/comments", ()=>{
    test("200: Responds an object with the key of comment and the value of a comment object for the given article id", () =>{
        const comment = {
            username: "butter_bridge",
            body : "Add a comment"	
        }
        return request(app)
        .post("/api/articles/3/comments")
        .send(comment)
        .expect(200)
        .then(({body})=>{
            const { username, comment_body, article_id } = body.comment
            expect(typeof username).toBe("string")
            expect(typeof article_id).toBe("number")
            expect(typeof comment_body).toBe("string")
            expect(article_id).toBe(3)
        })
    })
    test("400: Responds an error message with the error code 400 when article id is not exists", () =>{
        const comment = {
            username: "butter_bridge",
            body : "Add a comment"	
        }
        return request(app)
        .post("/api/articles/999/comments")
        .send(comment)
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Reference does not exist")
        })
    })
    test("400: Responds an error message with the error code 400 when article id is not valid", () =>{
        const comment = {
            username: "butter_bridge",
            body : "Add a comment"	
        }
        return request(app)
        .post("/api/articles/not-an-article-id/comments")
        .send(comment)
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Invalid input")
        })
    })
    test("404: Responds with an error message when the comment could not be added", () => {
    const comment = {}; 

    return request(app)
        .post("/api/articles/1/comments") 
        .send(comment)
        .expect(404)
        .then(({ body }) => {
            const { message } = body;
            expect(message).toBe("Comment not added");
        });
    });
})

describe("Patch /api/articles/:article_id", ()=>{
    test("200: Responds an updated article object with the key of article of the given article id", () =>{
        const article = { inc_votes: 100 }

        return request(app)
        .patch("/api/articles/3")
        .send(article)
        .expect(200)
        .then(({body})=>{
            const { author, title, article_id, topic, created_at, votes, article_img_url } = body.article
            expect(typeof author).toBe("string")
            expect(typeof article_id).toBe("number")
            expect(typeof votes).toBe("number")
            expect(article_id).toBe(3)
            expect(votes).toBe(100)
            expect(title).toBe("Eight pug gifs that remind me of mitch")
        })
    })
    test("400: Responds an error message with the error code 400 when article id is not valid", () =>{
        const article = { inc_votes: 100 }

        return request(app)
        .patch("/api/articles/not-an-article-id")
        .send(article)
        .expect(400)
        .then(({body})=>{
            const { message } = body
            return expect(message).toBe("Invalid input")
        })
    })
    test("404: Responds an error message when article id does not exists", () =>{
        const article = { inc_votes: 100 }

        return request(app)
        .patch("/api/articles/999")
        .send(article)
        .expect(404)
        .then(({body})=>{
           const { message } = body;
            expect(message).toBe("Article not updated");
        })
    })
    test("404: Responds an error message when article could not updated", () =>{
        const article = { }

        return request(app)
        .patch("/api/articles/3")
        .send(article)
        .expect(404)
        .then(({body})=>{
           const { message } = body;
            expect(message).toBe("Article not updated");
        })
    })
})
describe("Delete /api/comments/:comment_id", ()=>{
    test("204: Responds a status 204 and no content when the given comment id exists", () =>{
        return request(app)
        .delete("/api/comments/6")
        .expect(204)
    })
    test("400: Responds a 400 when the given comment id is not valid", () =>{
        return request(app)
        .delete("/api/comments/not-a-comment-id")
        .expect(400)
        .then(({body})=>{
             const { message } = body
            return expect(message).toBe("Invalid input")         
        })
    })
    test("404: Responds a 404 when the given comment id does not exists in database", () =>{
        return request(app)
        .delete("/api/comments/555")
        .expect(404)
        .then(({body})=>{
             const { message } = body
            return expect(message).toBe("Comment not found")         
        })
    })
})



