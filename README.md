# OPTITRACE FRONTEND

Logiciel de modélisation 2D 3D, de répresentation et analyse de donnée
**Optique**
**Thermique**
**Météorlogique**
**Thermodynamique**


Type d'analyses
plan (plan xy yz ou xz puis la position du plan) 
gométrie quelconque (équation de la géométrie)

11/10/2025
Revoir l'affichage du boutton afin d'indiquer aux utilisateur les deux valeur de l'état du boutton
 
```
const data = {
  scene: {
    geometries: [
      {
        type: "Parabolic",
        params: {
          f_x: 0.5,
          f_y: 0.8,
          size: 3,
          position: [0, 1.4, 0],
        },
      },
      {
        type: "Parabolic",
        params: {
          f_x: 0.5,
          f_y: 0.6,
          size: 2.7,
          position: [2, 5, -2],
        },
      },
      // {
      //   type: "Cylindric",
      //   params: {
      //     size: 2,
      //     height: 1.5,
      //     position: [4, 1 , 2],
      //   },
      // },
      // {
      //   type: "Cylindric",
      //   params: {
      //     size: 1.2,
      //     height: 1.8,
      //     position: [-3, 1, -1],
      //   },
      // },
    ],
  },
  source: {
    type: "Point",
    params: {
      position: [0, 3, -150000000],
      intensity: 1,
    },
  },
};
```