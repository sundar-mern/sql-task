//1. SQL Lesson 1: SELECT queries 101

//Problem 1: Find the title of each film

select title from Movies;

//Problem 2: Find the director of each film

select director from Movies;

//Problem 3: Find the title and director of each film

Select title, director from Movies;

//Problem 4: Find the title and year of each film

select title, year from Movies;

//Problem 5: Find all the information about each film

select * from Movies;

//2. SQL Lesson 2: Queries with constraints (Pt. 1)

//Problem 1: Find the movie with a row id of 6

select title from Movies where id = 6;

//Problem 2: Find the movies released in the years between 2000 and 2010

select title from Movies between 2000 and 2010;

//Problem 3: Find the movies not released in the years between 2000 and 2010

select title from Movies not between 2000 and 2010;

//Problem 4: Find the first 5 Pixar movies and their release year

Select title from Movies where id in (1,2,3,4,5)

//3. SQL Lesson 3: Queries with constraints 


//Problem 1: Find all the Toy Story movies

select title from Movies where title like "Toy Story%";

//Problem 2: Find all the movies directed by John Lasseter

select title from Movies where director = ‘John Lasseter’;

//Problem 3: Find all the movies (and directors) not directed by John Lasseter

select title from Movies where director != ‘John Lasseter’;

//Problem 4: Find all the WALL-* movies

select title from Movies where title like ‘WALL-%’;

//4. SQL Lesson 4: Filtering and Sorting Query Results

//Problem 1: List all directors of Pixar movies (alphabetically), without duplicates

SELECT distinct(director) from movies order by director asc;

//Problem 2: List the last four Pixar movies released (ordered from most recent to least)

select title from movies order by year desc limit 4;

//Problem 3: List the first five Pixar movies sorted alphabetically

select title from movies order by title asc limit 5;

//Problem 4: List the next five Pixar movies sorted alphabetically

select title from movies order by title asc limit 5 offset 5;


//5. SQL Review: Simple SELECT Queries


//Problem 1: List all the Canadian cities and their populations

SELECT city,Population FROM north_american_cities where country=’Canada’;


//Problem 2: Order all the cities in the United States by their latitude from north to south

select city from North_american_cities where Country = ‘United States’ 
order by Latitude desc;


//Problem 3: List all the cities west of Chicago, ordered from west to east

select city from North_american_cities where longitude< 
(select Longitude from North_american_cities where city = ‘Chicago’ ) 
order by longitude asc;

//Problem 4: List the two largest cities in Mexico (by population)

select City from North_american_cities where Country = ‘Mexico’ 
order by population desc limit 2;

//Problem 5: List the third and fourth largest cities (by population) in the United States and their population

select City from North_american_cities where Country = ‘United States’ 
order by population desc limit 2 offset 2;

//6. SQL Lesson 6: Multi-table queries with JOINs


//Problem 1: Find the domestic and international sales for each movie

SELECT title, Domestic_sales, International_sales from Movies 
inner join 
Boxoffice on Movies.Id = Boxoffice.Movie_id;

//Problem 2: Show the sales numbers for each movie that did better internationally rather than domestically

SELECT title, Domestic_sales, International_sales from Movies 
inner join 
Boxoffice on Movies.Id = Boxoffice.Movie_id 
where International_sales>Domestic_sales order by International_sales desc;

//Problem 3: List all the movies by their ratings in descending order

SELECT title,Rating from Movies inner join Boxoffice on 
Movies.Id = Boxoffice.Movie_id order by Rating desc;

//7. SQL Lesson 7: OUTER JOINs


//Problem 1: Find the list of all buildings that have employees

SELECT distinct(Building) FROM employees;


//Problem 2: Find the list of all buildings and their capacity

select * from Buildings;

//Problem 3: List all buildings and the distinct employee roles in each building (including empty buildings)

select distinct(Building_name), Role from Buildings 
left join
Employees on Buildings.Building_name = Employees.Building;

//8. SQL Lesson 8: A short note on NULLs
 
//Problem 1: Find the name and role of all employees who have not been assigned to a building

SELECT Name,role from Employees where Building is null;

//Problem 2: Find the names of the buildings that hold no employees

SELECT Building_name from Buildings 
left join Employees 
on Buildings.Building_name = Employees.Building where Name is null;

//9. SQL Lesson 9: Queries with expressions


//Problem 1: List all movies and their combined sales in millions of dollars

SELECT Title,(Domestic_sales + International_sales)/1000000 as 
[combined sales] from Movies inner join Boxoffice 
on Movies.Id = Boxoffice.Movie_id;

//Problem 2: List all movies and their ratings in percent

SELECT Title, round((Rating/10),2)*100 as Ratings from Movies 
inner join Boxoffice
on Movies.Id = Boxoffice.Movie_id order by Ratings desc;

//Problem 3: List all movies that were released on even number years

SELECT Title from Movies inner join Boxoffice on 
Movies.Id = Boxoffice.Movie_id where Year%2=0;

//10. SQL Lesson 10: Queries with aggregates 


//Problem 1: Find the longest time that an employee has been at the studio

select sum(Years_employed) as [longest time],Name from 
Employees group by Name order by [Longest Time] desc limit 1;

//Problem 2: For each role, find the average number of years employed by employees in that role

select Role, avg(Years_employed) from Employees group by Role;

//Problem 3: Find the total number of employee years worked in each building

select Building, sum(Years_employed) as [‘total number of employee years’] 
from Employees group by Building;


//11. SQL Lesson 11: Queries with aggregates (Pt. 2)

//Problem 1: Find the number of Artists in the studio (without a HAVING clause)

select count(Role) from Employees where Role = ‘Artist’;


//Problem 2: Find the number of Employees of each role in the studio

select Role, count(Role) as [number of Employees] from Employees group by Role;


//Problem 3: Find the total number of years employed by all Engineers

select sum(years_employed) as 
[total number of years employed by all Engineers]
from Employees group by Role having Role = ‘Engineer’;


//12. SQL Lesson 12: Order of execution of a Query

//Problem 1: Find the number of movies each director has directed

select Director, count(Title) as [number of movies] from Movies 
group by Director;


//Problem 2: Find the total domestic and international sales that can be attributed to each director

select Director, sum(Domestic_sales) + sum(International_sales) 
from Movies inner join Boxoffice on Movies.Id = Boxoffice.Movie_id 
group by Director;


//13. SQL Lesson 13: Inserting rows


//Problem 1: Add the studio’s new production, Toy Story 4 to the list of movies (you can use any director)

Insert into Movies (Title, director) values(‘Toy Story 4’, ‘Ravi Kumar’);


//Problem 2: Toy Story 4 has been released to critical acclaim! It had a rating of 8.7, and made 340 million domestically and 270 million internationally. Add the record to the BoxOffice table.


Insert into Boxoffice (Movie_id, Rating, Domestic_sales, 
International_sales) values(15, 8.7, 34000000, 27000000);


//14. SQL Lesson 14: Updating rows
 
//Problem 1: The director for A Bug’s Life is incorrect, it was actually directed by John Lasseter

Update Movies set Director = ‘John Lasseter’ where Title = “A Bug’s Life”;


//Problem 2: The year that Toy Story 2 was released is incorrect, it was actually released in 1999

Update Movies set Year = 1999 where Title = “Toy Story 2”;
To practice along with me go to this link.


//Problem 3: Both the title and director for Toy Story 8 is incorrect! The title should be “Toy Story 3” and it was directed by Lee Unkrich

Update Movies set Title = ‘Toy Story 3’, Director = ‘Lee Unkrich’ 
where Title = “Toy Story 8”;


//15. SQL Lesson 15: Deleting rows

//Problem 1: This database is getting too big, lets remove all movies that were released before 2005.

Delete from movies where Year < 2005;
 
//Problem 2: Andrew Stanton has also left the studio, so please remove all movies directed by him.

Delete from movies where Director = ‘Andrew Stanton’;


//16. SQL Lesson 16: Creating tables

// Problem 1: Create a new table named Database with the following columns:

// – Name A string (text) describing the name of the database
// – Version A number (floating point) of the latest version of this database
// – Download_count An integer count of the number of times this database was downloaded
// This table has no constraints.

Create table Database(Name Varchar(20), Version FLOAT, Download_count int);


 
//17. SQL Lesson 17: Altering tables

//Problem 1: Add a column named Aspect_ratio with a FLOAT data type to store the aspect-ratio each movie was released in.

Alter table Movies add Aspect_ratio float;


//Problem 2: Add another column named Language with a TEXT data type to store the language that the movie was released in. Ensure that the default for this language is English.

Alter table Movies add Language varchar(20) default ‘English’;


//18. SQL Lesson 18: Dropping tables

//Problem 1: We’ve sadly reached the end of our lessons, lets clean up by removing the Movies table

Drop table Movies;
 
// Problem 2: And drop the BoxOffice table as well

Drop table BoxOffice;
 