export class SearchDTO{

   searchString: string;
   pageNumber: number;
   pageSize: number;
   
   constructor(searchString: string, pageNumber: number, pageSize: number) {
		this.searchString = searchString;
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
	}

}