export const handleHome = (req, res) => {
    const fakeUser = {
        name: "jong",
        status: true
    }
    const videos = [
        {
            name: "first video",
            view: 52,
            comments: 3
        },
        {
            name: "second video",
            view: 52,
            comments: 3
        }, {
            name: "third video",
            view: 52,
            comments: 3
        }
    ]

    res.render("home", { pageTitle: "Home", fakeUser, videos });
}
export const handleEdit = (req, res) => res.send("Edit users");
export const join = (req, res) => res.send("Join");
export const login = (req, res) => res.send("Login");
export const handledelete = (req, res) => res.send("Delete");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See user");


