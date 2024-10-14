const StockCalculator = {
    // Calculate the absolute profit or loss with different buy and sell quantities
    calculateProfitOrLoss: function (buyPrice, buyQuantity, sellPrice, sellQuantity,brockerage_percentage) {
        // Calculate the total cost for the initial buy quantity
        const totalCost = buyPrice * buyQuantity;

        // Calculate the cost of the quantity being sold
        const costOfSoldQty = buyPrice * sellQuantity;

        // Calculate the revenue from the quantity being sold
        const revenueFromSoldQty = sellPrice * sellQuantity;

        // Profit or loss from the sold quantity
        var profitOrLoss = revenueFromSoldQty - costOfSoldQty;

        // brockrage percentage
        const brockerage_percentage_amt = profitOrLoss * (brockerage_percentage / 100);


        profitOrLoss = profitOrLoss - brockerage_percentage_amt;

        let prof_status = '';
        if (profitOrLoss > 0) {
            prof_status = 'profit';
        } else if (profitOrLoss < 0) {
            prof_status = 'loss';
        } else {
            prof_status = 'npnl'; // no prof no loss
        }

        // Calculate the remaining quantity
        const remainingQty = buyQuantity - sellQuantity;

        // Calculate the value of the remaining quantity at the purchase price
        const remainingValue = remainingQty * buyPrice;

        // Calculate the percentage of profit relative to the cost of the sold quantity
        const profitPercentage = (profitOrLoss / costOfSoldQty) * 100;

        // Return the results
        return {
            profitOrLoss: profitOrLoss,
            remainingQty: remainingQty,
            remainingValue: remainingValue,
            totalBuyValue: totalCost,
            prof_status: prof_status,
            brockerage_percentage_amt: brockerage_percentage_amt,
            profitPercentage: profitPercentage.toFixed(2) // Rounded to 2 decimal places
        };
    },

    // Calculate the percentage profit or loss for the sold quantity
    calculatePercentage: function (buyPrice, buyQuantity, sellPrice, sellQuantity) {
        const { profitOrLoss } = this.calculateProfitOrLoss(buyPrice, buyQuantity, sellPrice, sellQuantity);
        const costOfSoldQty = buyPrice * sellQuantity;
        return (profitOrLoss / costOfSoldQty) * 100;
    },

    // Determine if the transaction is a profit, loss, or break-even
    determineProfitOrLoss: function (buyPrice, buyQuantity, sellPrice, sellQuantity) {
        const { profitOrLoss } = this.calculateProfitOrLoss(buyPrice, buyQuantity, sellPrice, sellQuantity);
        if (profitOrLoss > 0) {
            return 'profit';
        } else if (profitOrLoss < 0) {
            return 'loss';
        } else {
            return 'no profit, no loss';
        }
    }

    
};

export default StockCalculator;