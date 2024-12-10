const handleDeleteChip = (chipType) => {
    switch (chipType) {
      case "documentType":
        setDocumentType("");
        break;
      case "dateRange":
        setDateRange([new Date(), new Date()]); // Reset to today's date
        break;
      case "account":
        setAccount("");
        break;
      case "period":
        setPeriod("");
        break;
      case "currency":
        setCurrency(""); // Reset currency
        break;
      default:
        break;
    }
  };
