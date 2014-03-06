# regex mainstream.radiox.ch/konzerte
# http://rubular.com/r/YdWP0NXaZb

# Draft #1
# regex = ^(?<day>\d{1,2})\.(?<month>\d{1,2})\s(?<artist>[\p{L}\s\/\w\&\(\)\!.'"’-]*)\S(?<venue>[\p{L}\s\/\w\&\(\)\!.'"’-]*)$

# Draft #2
# ^(?<day>(\d{1,2})(.*?)(\d{1,2}))\.(?<month>\d{1,2})\s(?<artist>[\p{L}\s\/\w\&\(\)\!.'"’-]*)\S(?<venue>[\p{L}\s\/\w\&\(\)\!.'"’-]*)$

r = /^(?<day>(\d{1,2})\.(?<month>\d{1,2})\s(?<artist>[^,]*)(?<venue>.*))/
