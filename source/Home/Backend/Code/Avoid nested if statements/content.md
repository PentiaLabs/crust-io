# Avoid nested if statements

Avoid nested if statements, instead **Assert**, **Check** and then **DO**

## Don't

~~~~javascript
    public void Wash(Car car,Database database, Item item)
    {
        if (car!=null)
        {
            if (database != null)
            {
                if (item != null)
                {
                    car.Wash(item);
                }
            }
        }
    }
~~~~

## Do 

~~~~javascript
   public void Wash([NotNull]Car car, [NotNull]Database database, Item item)
    {
        // make asertion  is the paramter IS required
        Assert.ArgumentNotNull(car, "car");
        Assert.ArgumentNotNull(database, "database");
        
        // make any checks i.e. if item null do nothing, as it is OK that it is null
        if (item == null)
            return;

        // do the work.....
        car.Wash(item);
    }
~~~~

