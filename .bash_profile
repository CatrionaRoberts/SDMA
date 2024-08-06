spider-run() {
  echo "" > logs.log
  echo "" > output.json
  scrapy crawl $1 -o output.json
}

spider-test() {
  echo "" > logs.log
  echo "" > test_output_log.log
  python path/to/spider_tester_script.py $1 -o test_output_log.log
}
