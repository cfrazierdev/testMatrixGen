
using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class RiskLevel
    {
        [Key]
        [Required]
        public double RiskLevelId { get; set; }
        [Required]
        public double Priority { get; set; }
    }
}