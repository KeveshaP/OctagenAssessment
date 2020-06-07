using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public partial class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options)
           : base(options)
        {
        }
        public virtual DbSet<AddressBook> AddressBook { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AddressBook>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Home)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Mobile)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Surname)
                   .IsRequired()
                   .HasMaxLength(200)
                   .IsUnicode(false);
                entity.Property(e => e.Email)
                  .IsRequired()
                  .HasMaxLength(300)
                  .IsUnicode(false);
                entity.Property(e => e.LastUpdated)
                  .IsUnicode(false);

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
