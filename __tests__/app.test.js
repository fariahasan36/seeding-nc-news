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
    test("200: responds with requested get all data from topics", () =>{
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
    test("200: responds with requested get all data from ariticles by counting the total comments", () =>{
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


