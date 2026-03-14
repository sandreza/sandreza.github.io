---
title: From Mean Response to Distribution Shifts
date: 2025-10-08
image:
  focal_point: 'top'
---

The paper [Predicting Forced Responses of Probability Distributions via the Fluctuation-Dissipation Theorem and Generative Modeling] is now out in PNAS.

<!--more-->

This work starts from [my earlier post on our PRL paper], where we showed that score-based generative modeling can be combined with the fluctuation-dissipation theorem to estimate how a nonlinear system responds, on average, to a small perturbation. The key quantity is the score function, which is the gradient of the system's log-likelihood. If we can estimate that quantity from data, then we can recover response information without directly perturbing the system.

In the new paper, we push that framework beyond the mean and ask how the full probability distribution changes under forcing. That means predicting not only average shifts, but also changes in variance, skewness, kurtosis, and the tails of the distribution. For climate applications, that matters because small forcings can show up through changes in variability and extremes, not only through changes in the average state.

We use two complementary approaches depending on the structure of the problem. For lower-dimensional reduced models, we estimate the score function with a clustering-based method called KGMM. For a high-dimensional 2D Navier-Stokes example with a localized perturbation, we instead use a U-Net to learn the score directly from data. In both settings, the generative-modeling approach does a much better job than the usual Gaussian approximation when the response is strongly non-Gaussian.

More broadly, the goal is to move toward an equation-free way of understanding how probability distributions respond to small forcings. That is especially appealing in climate problems, where we often care about shifts in tails and the frequency of rare events as much as we care about changes in the mean.

[Predicting Forced Responses of Probability Distributions via the Fluctuation-Dissipation Theorem and Generative Modeling]: /publication/predicting-forced-responses/
[my earlier post on our PRL paper]: /post/25-01-03-physical-review-letters/
