const videos = [
    {
        name: "first video",
        view: 52,
        comments: 3,
        id: 1
    },
    {
        name: "second video",
        view: 52,
        comments: 3,
        id: 2
    }, {
        name: "third video",
        view: 52,
        comments: 3,
        id: 3
    }
]
export const handleHome = (req, res) => {
    const fakeUser = {
        name: "jong",
        status: true
    }


    res.render("home", { pageTitle: "Home", fakeUser, videos });
}
export const watch = (req, res) => {
    const { id } = req.params
    const video = videos[id - 1]
    return res.render("watch", { pageTitle: "Watching " + video.name, video })
};
export const edit = (req, res) => res.send("Edit videos")
export const search = (req, res) => res.send("search videos")
export const upload = (req, res) => res.send("upload videos")
export const deleteVideo = (req, res) => res.send("Delete videos")

