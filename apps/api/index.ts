import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";
import cors from "cors";


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/v1/website",authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const url = req.body.url;
    const name = req.body.name;
    const  data = await prismaClient.website.create({
        data: {
            userId,
            name,
            url
        },
    })
    res.json({
        id:data.id
    })

});

app.get("/api/v1/website/status",authMiddleware, async (req, res) => {
    const websiteId = req.query.websiteId! as unknown as string; 
    const userId = req.userId!;
    const data = await prismaClient.website.findFirst({
        where:{
            id:websiteId,
            userId,
            disabled:false
        },
        include:{
            status:true
        }
    })
    res.json(
        data
    )
});

app.get("/api/v1/websites",authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const websites = await prismaClient.website.findMany({
        where:{
            userId,
            disabled:false
        },
        include:{
            status:true
        }
    })
    res.json({
        websites
    })

});

app.put("/api/v1/websites/:id",authMiddleware, async (req, res) => {
    const websiteId = req.body.websiteId;
    const userId = req.userId!;
    await prismaClient.website.update({
        where:{
            id:websiteId,
            userId
        },
        data:{
            disabled:true
        }
    })
    res.json({
        message:"Website disabled successfully"
    })
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
}
);