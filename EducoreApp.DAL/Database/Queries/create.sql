Create Table TempUsers(
FirstName varchar(200),
LastName varchar(200),
Email varchar(200),
Password varchar(200),
Mobile varchar(200),
OTP int)

Create Table Users(
UserId int identity(1,1),
FirstName varchar(200),
LastName varchar(200),
Email varchar(200),
Password varchar(200),
Mobile varchar(200),
Active int,
Role varchar(200),
Discounut int,
Avatar varchar(200),
EmailVerification Datetime,
OTPVerification Datetime)

Create Table UserTokens(
UserTokenId int identity(1,1),
RequestedBy varchar(200),
RequestedType varchar(200),
Token varchar(max),
ExpiredDate Datetime)

Create table Courses(
CourseId int identity(1,1),
Title varchar(1000),
Description nvarchar(max),
Price int,
CreatedAt datetime,
UpdatedAt datetime
);

Create table Videos(
VideoId int identity(1,1),
CourseId int,
Name varchar(1000),
VideoUrl varchar(1000),
CreatedAt datetime,
UpdatedAt datetime);

Create table PaymentDetails(
Id int identity(1,1),
PaymentId varchar(200),
CourseId int,
UserId int,
PaymentDate datetime
);

Create table EmailConfig(
Id int identity(1,1),
Email varchar(200),
AccessToken nvarchar(max),
RefreshToken nvarchar(max),
ExpiredTime Datetime)