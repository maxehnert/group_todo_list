/* global describe, it */

(function () {
  'use strict';



    describe('building a list', function(){
      var list;

      beforeEach(function(){
        list = new ToDo;
      });

      describe('list creation', function(){

        it('should be an instance of a list', function(){
          expect(list).to.be.an.instanceof(ToDo);
        });

        it('should have a task', function(){
          expect(list.task).to.equal('');
        });

        // it('should be rendered as result of elem', function(){
        //   expect(list.elem).to.equal('rendered');
        // });

        it('should be complete after its checked', function(){
          expect(list.status).to.equal('incomplete');
          list.check();
          expect(list.status).to.equal('complete');
        });



      });
    });
})();



//
// /* global describe, it */
//
// (function () {
//   'use strict';
//
//   describe('A Cat Object', function () {
//
//     var cat;
//
//     beforeEach(function() {
//       cat = new Cat();
//     });
//
//     describe('Cat Creation', function () {
//
//       it('should be an instance of Cat', function() {
//         expect(cat).to.be.an.instanceof(Cat);
//       });
//
//     });
//
//     describe('Cat Properties', function (){
//
//       it('should have a default color', function() {
//         expect(cat.color).to.equal('brown');
//       });
//
//       it('should overwrite color', function () {
//         cat.color = 'grey';
//         expect(cat.color).to.equal('grey');
//       });
//
//       it('should have a status', function () {
//         expect(cat).to.have.property('status');
//       });
//
//       it('should be grumpy by default', function () {
//         expect(cat.status).to.equal('grumpy');
//       });
//
//       it('should be happy after it eats', function () {
//         expect(cat.status).to.equal('grumpy');
//         cat.feed();
//         expect(cat.status).to.equal('happy');
//       });
//
//     });
//
//   });
//
// })();
