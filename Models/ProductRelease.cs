using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class ProductRelease
    {
        [Key]
        [Required]
        public double ProductReleaseId { get; set; }
        [Required]
        public double ProductReleaseVersion { get; set; }
    }
}