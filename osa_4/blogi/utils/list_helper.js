const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    // https://stackoverflow.com/a/4020842
    const highest = Math.max.apply(Math,blogs.map(function(o){return o.likes;}))
    return blogs.find(function(b) {return b.likes == highest})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}