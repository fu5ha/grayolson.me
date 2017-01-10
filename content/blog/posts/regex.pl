use strict;
use warnings;

$|=1;

sub main {
    while (my $dated_file_path = <>) {
        chomp $dated_file_path;
        
        my $dated_file_name = $dated_file_path;
        $dated_file_name =~ s/\/.+\/(.+)$/$1/;

        my $date = $dated_file_name;
        my $file_name = $dated_file_name;
        $date =~ s/(\d{4}-\d{2}-\d{2})-[d{4}-]?.*/$1/;
        $file_name =~ s/(\d{4}-\d{2}-\d{2})-(\d{4}-)?(.*)(\.\w+)/$3.md/;

        $file_name =~ s/ap-photo-week/breadth-week/;
        $file_name =~ s/ap-photo-//;

        my $file_base_path = "/mnt/c/Users/gray/dev/grayolson.com-phenomic/content/blog/posts/ap-photo/";
        
        # print "$dated_file_name\n";
        # print "$date\n";
        # print "$file_name\n";
        print $file_base_path.$file_name."\n";

        open(INPUT, $file_base_path.$file_name) or die $!;
        open(OUTPUT, ">", $file_base_path."/new/".$file_name) or die $!;

        # my $file_content;
        # my $n = read FILE, $file_content, -s FILE;
        
        # $file_content =~ s/---.+---/test/;
        # print $file_content;
        my $last_line = "";
        my $separator_count = 0;
        while(my $line = <INPUT>) {
            print OUTPUT $last_line;
            if ($line =~ m/---/) {
                $separator_count += 1;
                if ($separator_count == 2) {
                    print OUTPUT "date: $date\n";
                }
            }
            if ($separator_count == 1) {
                $line =~ s/^\s+$//;
            }
            $last_line = $line;
        }

        close(INPUT);
        close(OUTPUT);
    }
}

main();