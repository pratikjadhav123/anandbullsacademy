using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]/[action]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private ICourse iCourse;
        private ITopic iTopic;

        public TopicController(ICourse iCourse, ITopic iTopic)
        {
            this.iCourse = iCourse;
            this.iTopic = iTopic;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            IEnumerable<Topic> topics = await this.iTopic.GetTopics();
            return Ok(topics);
        }

        [HttpGet("{TopicId}")]
        public async Task<ActionResult<Topic>> GetTopic(int TopicId)
        {
            Topic topic = await this.iTopic.GetTopic(TopicId);
            if (topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            return Ok(topic);
        }

        [HttpGet("{CourseId}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopicsOfCourse(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            IEnumerable<Topic> topics = await this.iTopic.GetTopicsOfCourse(CourseId);
            return Ok(topics);
        }

        [HttpPost]
        public async Task<ActionResult<Topic>> SaveTopic([FromForm] TopicRequest TopicRequest)
        {
            Course Course = await this.iCourse.GetCourse(TopicRequest.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            Topic Topic = await this.iTopic.SaveTopic(TopicRequest);
            return Ok(Topic);
        }

        [HttpPut("{TopicId}")]
        public async Task<ActionResult<Topic>> UpdateTopic(int TopicId, [FromForm] TopicRequest TopicRequest)
        {
            Topic Topic = await this.iTopic.GetTopic(TopicId);
            if (Topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            Course Course = await this.iCourse.GetCourse(TopicRequest.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.iTopic.UpdateTopic(Topic, TopicRequest));
        }

        [HttpDelete("{TopicId}")]
        public async Task<ActionResult<Topic>> DeleteTopic(int TopicId)
        {
            Topic Topic = await this.iTopic.GetTopic(TopicId);
            if (Topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            return Ok(await this.iTopic.DeleteTopic(Topic));
        }
    }
}