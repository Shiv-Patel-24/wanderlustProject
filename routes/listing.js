const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
  .route("/")
  .get( wrapAsync(listingController.index))
  .post(
    isLoggedIn,  
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );
  // .post( (req, res) =>{
  //   res.send(req.file);
  // })
  
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;



// router.get(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params; //extracting the ID // also did "extended : true" in staring
//     const listing = await Listing.findById(id).populate("reviews");
//     if (!listing) {
//       req.flash("error", "Listing you requested for does not exist");
//       res.redirect("/listings");
//     }
//     res.render("listings/show.ejs", { listing });
//   })
// );

