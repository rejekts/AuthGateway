exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          user_email: "James@james.com",
          user_password:
            "$2b$15$wQvbb4OrCElNNNYYUccMduUoU.UvKvdhLRjCbXxCwKC/5fZvm8aaW" //jamesd
        },
        {
          user_email: "Justin@justin.com",
          user_password:
            "$2b$15$HPm2OfMM8ebq1gdzUAGnR.x63eCo2G600jJHrjzTwQgNcJ148MDKW" //justins
        },
        {
          user_email: "asdf",
          user_password:
            "$2b$15$dx9ZxyXgaCOnnAv9G/98MuLzIfPrOeMf/fqXraCnCr96PYEIIf.Ou" //asdf
        },
        {
          user_email: "Nick@nick.com",
          user_password:
            "$2b$15$r5YTrRTZtPiglAEyP6QS8O2Qap/FQmg4kNW0Mo9FLbLtW5fAdxXpu" //nickf
        }
      ]);
    });
};
