namespace EducoreApp.DAL.Request
{
    public class UserEmailOptions
    {
        public string ToEmails { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<KeyValuePair<string, string>> PlaceHolders { get; set; }
    }
}