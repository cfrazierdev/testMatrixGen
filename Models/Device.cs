using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class Device
    {
        [Key]
        [Required]
        public double DeviceId { get; set; }
        [Required]
        public string DeviceTag { get; set; }
        [Required]
        public string DeviceName { get; set; }
        [Required]
        public double BrowserId { get; set; }
    }
}