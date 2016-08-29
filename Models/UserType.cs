using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class UserType
    {
        [Key]
        [Required]
        public double UserTypeId { get; set; }
        [Required]
        public string UserTypeDescription { get; set; }
        [Required]
        public double UserTypeMultiplier { get; set; }
    }
}