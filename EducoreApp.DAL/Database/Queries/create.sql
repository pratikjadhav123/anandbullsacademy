Create Table TempUsers(
FirstName varchar(200),
LastName varchar(200),
Email varchar(200),
Password varchar(200),
Mobile varchar(200),
OTP int)

Create Table Users(
UserId int Identity(1,1) Primary Key,
FirstName varchar(200),
LastName varchar(200),
Email varchar(200),
Password varchar(200),
Mobile varchar(200),
Active int,
Role varchar(200),
Avatar varchar(200),
EmailVerification Datetime,
OTPVerification Datetime)

Create Table UserTokens(
UserTokenId int Identity(1,1) Primary Key,
RequestedBy varchar(200),
RequestedType varchar(200),
Token varchar(max),
ExpiredDate Datetime)

Create table Courses(
CourseId int Identity(1,1) Primary Key,
Title varchar(1000),
Description nvarchar(max),
Price int,
CreatedAt datetime,
UpdatedAt datetime
);

Create table Videos(
VideoId int Identity(1,1) Primary Key,
CourseId int,
Name varchar(1000),
VideoUrl varchar(1000),
CreatedAt datetime,
UpdatedAt datetime);

Create table PaymentDetails(
Id int Identity(1,1) Primary Key,
PaymentId varchar(200),
CourseId int,
UserId int,
Details nvarchar(max),
PaymentDate datetime
);

Create table EmailConfig(
Id int Identity(1,1) Primary Key,
Email varchar(200),
AccessToken nvarchar(max),
RefreshToken nvarchar(max),
ExpiredTime Datetime)

Create table Coupons(
CouponId int Identity(1,1) Primary Key,
CourseId int, 
Amount int);

drop table CouponVerification
Create table CouponVerification(
Id int Identity(1,1) Primary Key,
CourseId int,
Coupon varchar(100))
