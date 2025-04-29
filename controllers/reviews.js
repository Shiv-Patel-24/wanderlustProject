const Listing = require("../models/listing")
const Review = require("../models/review")

module.exports.createReview = async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); //Show.ejs created a form when the from submit "review[rating], review[comment]" backend pass
    newReview.author = req.user._id;
    listing.reviews.push(newReview); //models-> reviews array created a new. that will be pass here

    await newReview.save();
    await listing.save();

    // console.log("new review saved")
    // res.send("new review saved")
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  }

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // here i am using mongoose "$pull" operator
    await Listing.findByIdAndUpdate(id, { $pull: { reviewId } });

    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }