SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON

GO
IF EXISTS (SELECT * FROM sys.objects WHERE object_id =OBJECT_ID(N'dbo.SP_SaveVideos') AND TYPE IN (N'P', N'PC'))
DROP PROCEDURE [dbo].[SP_SaveVideos]
GO

CREATE PROCEDURE [dbo].[SP_SaveVideos] 
		 @json nvarchar(max)
AS
BEGIN
		BEGIN TRANSACTION Trans1
		BEGIN TRY
				
			MERGE INTO[dbo].[Videos] AS target USING
			(
			SELECT id, title FROM OPENJSON(@json,'$.rows')
			WITH
			(	id	 varchar(max) '$.id',
				title varchar(250) '$.title') 
			) AS source ON target.VideoUrl = source.id

			--INSERT NEW Owner
			WHEN NOT MATCHED BY target THEN
			INSERT ([CourseId], [Name], [VideoUrl],[CreatedAt],[UpdatedAt]) 
			VALUES (1, source.title, source.id, GETUTCDATE(),GETUTCDATE())
	
			--UPDATE EXISTING Owner
			WHEN MATCHED THEN  
			UPDATE SET  
			target.Name = source.title,
			target.VideoUrl = source.id,
			target.UpdatedAt = GETUTCDATE();

	
			COMMIT TRANSACTION;
		END TRY
		BEGIN CATCH

			IF @@TRANCOUNT > 0
				BEGIN
					ROLLBACK TRANSACTION Trans1;
				END
		END CATCH

END
