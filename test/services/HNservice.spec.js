import * as HNservice from './../../app/services/HNservice';
describe('Fetch item with a proper id', () => {
  it('should be valid', () => {
	let id = 126809;
	let hn = null;
	HNservice
	  .itemRefJSON(id)
	  .then((item) => {
		expect(item.id).toBe(id);
	  });
  });
});


describe("Fetch list of trending news", () => {
  it('should return a list of ids', ()=> {
	HNservice
	  .fetchAllItemsJSON()
	  .then((items) =>{
		console.warn(items.length);
		expect(items.length).not.toBe(0);
	  })
  });
});
