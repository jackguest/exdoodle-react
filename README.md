# exdoodle-react
UI/UX Container (React V16) Ramblings in graphical presentation of Data.

Initial Commit and Project Creation
  - Immediate Needs:
      1. Docs
      2. Tests
      3. Accompanying Server implentations for preferences other than Flask.
  - Next:
      1. Contributors and Discussions.  Please!  The idea here, is a fully open and collaborative venture into integrating Data Visualization
      tools into modern javascript frameworks, whatever the flavor might be.  The choice of React as a first commit was simply
      a matter of a coin flip.


This project is in a very raw initial form.  The server acts as an intermediary and storage facility for free publicly available data API's.
Currently alphavantage.co for Stock Exchange data and the NY Times 'archive_api' for news headlines.

Please Standby for updates.

# Screenshot Intros

## Landing Page
![landing](https://user-images.githubusercontent.com/10500450/38440856-c325e968-39b0-11e8-8a8a-025cba2b1aac.png)

## Unfiltered Stocks List
![unfilteredstocklist](https://user-images.githubusercontent.com/10500450/38441216-fc6dcae6-39b1-11e8-8bfb-6b3d928b901c.png)

## Filtered
By: industry = software, Name = <contains 'b'>, sort = 'asc'
![filteredlist](https://user-images.githubusercontent.com/10500450/38441588-40c53124-39b3-11e8-9e6f-e4c17022f3aa.png)

## Selected some stocks.
Minimized View
![selectedmin](https://user-images.githubusercontent.com/10500450/38441896-4465f5d8-39b4-11e8-87ee-d2b4fb23889a.png)

## Expanded Select Preview
Monthly adjusted values for all available periods per stock.
![selectedexpandedmonthlyadj](https://user-images.githubusercontent.com/10500450/38443466-c2e01cd6-39b9-11e8-9fb0-b385243fda54.png)

## Doodle "100 Days with News"
Selected Sabre Stock.  Mouse rollover on chart at 2018-01-10 shows NY Times Archive API filtered server side by
{ 'economy', 'finance', 'stock', 'market', 'crisis', 'terror', 'job', 'shareholder', 'elect' }
News is reset for each increment available on chart by date.
![100daysnews](https://user-images.githubusercontent.com/10500450/38443979-9fdf01a0-39bb-11e8-8763-65062c945c50.png)
