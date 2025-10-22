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



