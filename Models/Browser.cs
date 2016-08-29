using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class Browser
    {
        [Key]
        [Required]
        public double BrowserId { get; set; }
        [Required]
        public string BrowserName { get; set; }
        [Required]
        public double BrowserPercentageWeight { get; set; }
    }
}