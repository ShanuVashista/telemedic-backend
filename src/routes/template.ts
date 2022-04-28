import express from "express";
const router = express.Router();
router.get('/general-test', (req, res) => {
    res.render('general-test', { name: 'Soham Mitra',address: 'Test, test test', city: 'Kolkata' })
  })
  router.get('/cardiac', (req, res) => {
    res.render('cardiac', { })
  })
  router.get('/ct-scan', (req, res) => {
    res.render('ct-scan', { })
  })
  router.get('/mri', (req, res) => {
    res.render('mri', { })
  })
  router.get('/rxone', (req, res) => {
    res.render('rxone', { })
  })
  router.get('/rxtwo', (req, res) => {
    res.render('rxtwo', { })
  })
  router.get('/sick', (req, res) => {
    res.render('sick', { })
  })
  router.get('/x-ray', (req, res) => {
    res.render('x-ray', { })
  })
export = router;