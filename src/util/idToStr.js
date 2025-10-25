function getTerrainStr(id) {
    switch (id) {
      case 0:
          return "Grass";
      case 1:
          return "Forest"
      case 2:
          return "Sand"
      case 3:
          return "Mountains"
      case 4:
          return "Water"
      default:
        return null
    }
  }